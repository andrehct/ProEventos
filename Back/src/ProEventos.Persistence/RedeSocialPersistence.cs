using ProEventos.Domain;
using ProEventos.Persistence.InterfacesPersistencia;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace ProEventos.Persistence
{
    public class RedeSocialPersistence : GeralPersistence, IRedeSocialPersist
    {
        private readonly ProEventosContext _context;
        public RedeSocialPersistence(ProEventosContext context) : base(context)
        {
            _context = context;
        }
        public async Task<RedeSocial> GetRSEventoByIdsAsync(int eventoId, int id)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;

            query = query.AsNoTracking().Where(rs => rs.EventoId == eventoId &&
                                                     rs.Id == id);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<RedeSocial> GetRSPalestranteByIdsAsync(int palestranteId, int id)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;

            query = query.AsNoTracking().Where(rs => rs.PalestranteId == palestranteId &&
                                                     rs.Id == id);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<RedeSocial[]> GetAllByEventoIdAsync(int eventoId)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;

            query = query.AsNoTracking().Where(rs => rs.EventoId == eventoId);

            return await query.ToArrayAsync();
        }
        public async Task<RedeSocial[]> GetAllByPalestranteIdAsync(int palestranteId)
        {
            IQueryable<RedeSocial> query = _context.RedesSociais;

            query = query.AsNoTracking().Where(rs => rs.PalestranteId == palestranteId);

            return await query.ToArrayAsync();
        }
    }
}