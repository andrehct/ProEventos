using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.InterfacesPersistencia
{
    public interface IPalestrantePersist
    {
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos);
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
        Task<Palestrante> GetPalestranteByIdAsync(int id, bool includeEventos);
    }
}
