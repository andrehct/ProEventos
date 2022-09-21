using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.InterfacesPersistencia
{
    public interface IEventoPersist
    {
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int id, bool includePalestrantes = false);
    }
}
