using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using Microsoft.AspNetCore.Identity;

namespace ProEventos.Application.Servicos
{
    public interface IUserService
    {
        Task<bool> UserExists(string username);
        Task<UserUpdateDto> GetUserByUsernameAsync(string username);
        Task<SignInResult> CheckUserPassAsync(UserUpdateDto userUpdateDto, string pass);
        Task<UserUpdateDto> CreateUserAsync(UserDto userDto);
        Task<UserUpdateDto> UpdateUser(UserUpdateDto userUpdateDto);
    }
}
