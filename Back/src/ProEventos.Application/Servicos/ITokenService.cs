using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Servicos
{
    public interface ITokenService
    {
        Task<string> CreateToken(UserUpdateDto userUpdateDto);
    }
}
