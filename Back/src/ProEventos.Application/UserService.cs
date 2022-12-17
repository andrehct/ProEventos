using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProEventos.Application.Dtos;
using ProEventos.Application.Servicos;
using ProEventos.Domain.Identity;
using ProEventos.Persistence.InterfacesPersistencia;

namespace ProEventos.Application
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly IUserPersist _userPersist;
        public UserService(UserManager<User> userManager, SignInManager<User> signInManager,
                            IMapper mapper, IUserPersist userPersist)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _userPersist = userPersist;
        }
        public async Task<SignInResult> CheckUserPassAsync(UserUpdateDto userUpdateDto, string pass)
        {
            try
            {
                var user = await _userManager.Users.SingleOrDefaultAsync(user => user.UserName == userUpdateDto.UserName);

                return await _signInManager.CheckPasswordSignInAsync(user, pass, false);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar verificar o password. Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDto> CreateUserAsync(UserDto userDto)
        {
            try
            {
                var user = _mapper.Map<User>(userDto);
                var result = await _userManager.CreateAsync(user, userDto.Password);

                if(result.Succeeded)
                {
                   var userToReturn = _mapper.Map<UserUpdateDto>(user);
                   return userToReturn;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar criar usuário. Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDto> GetUserByUsernameAsync(string username)
        {
            try
            {
                var user = await _userPersist.GetUserByUsernameAsync(username);
                if(user == null) return null;

                var userUpdateDto = _mapper.Map<UserUpdateDto>(user);

                return userUpdateDto;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar pegar usuário por username. Erro: {ex.Message}");
            }
        }

        public async Task<UserUpdateDto> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                var user = await _userPersist.GetUserByUsernameAsync(userUpdateDto.UserName);
                if(user == null) return null;

                userUpdateDto.Id = user.Id;

                _mapper.Map(userUpdateDto, user);

                if(userUpdateDto.Password != null)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    await _userManager.ResetPasswordAsync(user, token, userUpdateDto.Password);
                }

                _userPersist.Update<User>(user);
                
                if(await _userPersist.SaveChangesAsync())
                {
                   var userRetorno = await _userPersist.GetUserByUsernameAsync(user.UserName);
                   return _mapper.Map<UserUpdateDto>(userRetorno);
                }
                
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar atualizar usuário. Erro: {ex.Message}");
            }
        }

        public async Task<bool> UserExists(string username)
        {
            try
            {
                return await _userManager.Users.AnyAsync(user => user.UserName == username);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao verificar se usuário existe. Erro: {ex.Message}");
            }
        }
    }
}