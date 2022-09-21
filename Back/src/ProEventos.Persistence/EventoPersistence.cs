using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.InterfacesPersistencia;

namespace ProEventos.Persistence
{
    public class EventoPersistence : IEventoPersist
    {
        private readonly ProEventosContext _context;
        public EventoPersistence(ProEventosContext context)
        {
            this._context = context;
            //No EventoService.cs (do Application) o "UpdateEvento" faz primeiro um get e depois um update
            //O get segura o elemento (evento) e o update não consegue mexer. PARA SOLUCIONAR:
            //O "AsNoTracking" serve para não segurar os elementos (eventos), pode fazer em cada lugar como fiz, ou só aqui (ai fica geral no EventoPersistence), descomentando a linha abaixo
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Evento> query = _context.Eventos
                                                    .Include(e => e.Lotes)
                                                    .Include(e => e.RedesSociais);
            //End
            //Begin - Necessário pois é uma relação "muitos para muitos"
            if(includePalestrantes)
            {
                query = query
                            .Include(e => e.PalestrantesEventos)
                            .ThenInclude(pe => pe.Palestrante);
            }
            //End
            query = query.AsNoTracking().OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Evento> query = _context.Eventos
                                                    .Include(e => e.Lotes)
                                                    .Include(e => e.RedesSociais);
            //End
            //Begin - Necessário pois é uma relação "muitos para muitos"
            if(includePalestrantes)
            {
                query = query
                            .Include(e => e.PalestrantesEventos)
                            .ThenInclude(pe => pe.Palestrante);
            }
            //End
            query = query.AsNoTracking().OrderBy(e => e.Id)
                         .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int id, bool includePalestrantes = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Evento> query = _context.Eventos
                                                    .Include(e => e.Lotes)
                                                    .Include(e => e.RedesSociais);
            //End
            //Begin - Necessário pois é uma relação "muitos para muitos"
            if(includePalestrantes)
            {
                query = query
                            .Include(e => e.PalestrantesEventos)
                            .ThenInclude(pe => pe.Palestrante);
            }
            //End
            query = query.AsNoTracking().OrderBy(e => e.Id)
                         .Where(e => e.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}