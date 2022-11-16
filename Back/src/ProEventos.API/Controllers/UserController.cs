using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Servicos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using ProEventos.Application.Dtos;
using ProEventos.API.Extensions;
using ProEventos.API.Helpers;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IUtil _util;
        private readonly string _destino = "Perfil";

        public UserController(IUserService userService, IUtil util, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this._userService = userService;
            this._util = util;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                string userName = User.GetUserName();
                var user = await _userService.GetUserByUsernameAsync(userName);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                                    $"Erro ao tentar recuperar usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                if(await _userService.UserExists(userDto.Username)) 
                    return BadRequest("Usuário já existe");

                var user = await _userService.CreateUserAsync(userDto);

                if(user != null)
                    return Ok(new 
                        {userName = user.Username,
                        primNome = user.PrimeiroNome,
                        token = _tokenService.CreateToken(user).Result}
                    );

                return BadRequest("Usuário não criado, tente novamente mais tarde!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                                    $"Erro ao tentar registrar usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            try
            {
                var user = await _userService.GetUserByUsernameAsync(userLoginDto.Username);
                if(user == null) return Unauthorized("Usuário está errado");

                var result = await _userService.CheckUserPassAsync(user, userLoginDto.Password);
                if (!result.Succeeded) return Unauthorized();

                return Ok(new 
                    {userName = user.Username,
                    primNome = user.PrimeiroNome,
                    token = _tokenService.CreateToken(user).Result}
                );
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                                    $"Erro ao tentar realizar login. Erro: {ex.Message}");
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                if(userUpdateDto.Username != User.GetUserName())
                    return Unauthorized("Usuário inválido!");

                var user = await _userService.GetUserByUsernameAsync(User.GetUserName());
                if(user == null) return Unauthorized("Usuário inválido");

                var userReturn = await _userService.UpdateUser(userUpdateDto);

                if(userReturn == null)
                    return NoContent();

                return Ok(new 
                    {userName = userReturn.Username,
                    primNome = userReturn.PrimeiroNome,
                    token = _tokenService.CreateToken(userReturn).Result});
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                                    $"Erro ao tentar atualizar usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("upload-image")]

        public async Task<IActionResult> UploadImage()
        {
            try
            {
                var user = await _userService.GetUserByUsernameAsync(User.GetUserName());
                if (user == null) return NoContent();

                var file = Request.Form.Files[0];

                if (file.Length > 0)
                {
                    _util.DeleteImage(user.ImagemURL, _destino);
                    user.ImagemURL = await _util.SaveImage(file, _destino);
                }

                var UserRetorno = await _userService.UpdateUser(user);

                return Ok(UserRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar realizar upload de imagem do usuário. Erro: {ex.Message}");
            }
        }
    }
}
