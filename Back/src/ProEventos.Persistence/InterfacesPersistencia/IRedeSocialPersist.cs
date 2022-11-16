using ProEventos.Domain;
using System.Threading.Tasks;
using ProEventos.Domain.Identity;

namespace ProEventos.Persistence.InterfacesPersistencia
{
    public interface IRedeSocialPersist : IGeralPersist
    {
        Task<RedeSocial> GetRSEventoByIdsAsync(int eventoId, int id);
        Task<RedeSocial> GetRSPalestranteByIdsAsync(int palestranteId, int id);
        Task<RedeSocial[]> GetAllByEventoIdAsync(int eventoId);
        Task<RedeSocial[]> GetAllByPalestranteIdAsync(int palestranteId);
    }
}
