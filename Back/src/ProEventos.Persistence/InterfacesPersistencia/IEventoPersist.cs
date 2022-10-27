using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.InterfacesPersistencia
{
    public interface IEventoPersist
    {
        Task<Evento[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(int userId, bool includePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int userId, int id, bool includePalestrantes = false);
    }
}
