using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.InterfacesPersistencia;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence
{
    public class PalestrantePersistence : GeralPersistence, IPalestrantePersist
    {
        private readonly ProEventosContext _context;
        public PalestrantePersistence(ProEventosContext context) : base(context)
        {
            this._context = context;
            //Olhar no EventoPersistence.cs o motivo da linha abaixo.
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.User)
                                                                 .Include(p => p.RedesSociais);
            //End
            //Begin - Necessário pois é uma relação "muitos para muitos"
            if(includeEventos)
            {
                query = query
                            .Include(p => p.PalestrantesEventos)
                            .ThenInclude(pe => pe.Evento);
            }
            //End
            query = query.Where(p =>(
                                        p.MiniCurri.ToLower().Contains(pageParams.Term.ToLower()) ||
                                        p.User.PrimeiroNome.ToLower().Contains(pageParams.Term.ToLower()) ||
                                        p.User.UltimoNome.ToLower().Contains(pageParams.Term.ToLower())
                                    ) &&
                                    p.User.Funcao == Domain.Enum.Funcao.Palestrante)
                         .OrderBy(p => p.Id);

            return await PageList<Palestrante>.CreateAsync(query, pageParams.PageNumber, pageParams.pageSize);
        }

        public async Task<Palestrante> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false)
        {
            //Begin - "Includes" necessários em relações "um para muitos"
            IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.User)
                                                                 .Include(e => e.RedesSociais);
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
                         .Where(p => p.UserId == userId);

            return await query.FirstOrDefaultAsync();
        }
    }
}