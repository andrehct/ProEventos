using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Servicos
{
    public interface IRedeSocialService
    {
        Task<RedeSocialDto[]> SaveByEvento(int eventoId, RedeSocialDto[] models);

        Task<bool> DeleteByEvento(int eventoId, int rsId);

        Task<RedeSocialDto[]> SaveByPalestrante(int palestranteId, RedeSocialDto[] models);

        Task<bool> DeleteByPalestrante(int palestranteId, int rsId);

        Task<RedeSocialDto[]> GetAllByEventoIdAsync(int eventoId);

        Task<RedeSocialDto[]> GetAllByPalestranteIdAsync(int palestranteId);

        Task<RedeSocialDto> GetRSEventoByIdsAsync(int eventoId, int rsId);

        Task<RedeSocialDto> GetRSPalestranteByIdsAsync(int palestranteId, int rsId);
    }
}