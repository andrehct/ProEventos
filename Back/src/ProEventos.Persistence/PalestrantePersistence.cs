using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.InterfacesPersistencia;

namespace ProEventos.Persistence
{
    public class PalestrantePersistence : IPalestrantePersist
    {
        private readonly ProEventosContext _context;
        public PalestrantePersistence(ProEventosContext context)
        {
            this._context = context;
            //Olhar no EventoPersistence.cs o motivo da linha abaixo.
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.RedesSociais);
            //End
            //Begin - Necessário pois é uma relação "muitos para muitos"
            if(includeEventos)
            {
                query = query
                            .Include(p => p.PalestrantesEventos)
                            .ThenInclude(pe => pe.Evento);
            }
            //End
            query = query.OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Palestrante> query = _context.Palestrantes.Include(e => e.RedesSociais);
            //End
            //Begin - Necessário pois é uma relação "muitos para muitos"
            if(includeEventos)
            {
                query = query
                            .Include(p => p.PalestrantesEventos)
                            .ThenInclude(pe => pe.Evento);
            }
            //End
            query = query.OrderBy(p => p.Id)
                         .Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteByIdAsync(int id, bool includeEventos = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Palestrante> query = _context.Palestrantes.Include(e => e.RedesSociais);
            //End
            //Begin - Necessário pois é uma relação "muitos para muitos"
            if(includeEventos)
            {
                query = query
                            .Include(p => p.PalestrantesEventos)
                            .ThenInclude(pe => pe.Evento);
            }
            //End
            query = query.OrderBy(p => p.Id)
                         .Where(p => p.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}