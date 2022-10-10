using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.InterfacesPersistencia;

namespace ProEventos.Persistence
{
    public class LotePersistence : ILotePersist
    {
        private readonly ProEventosContext _context;
        public LotePersistence(ProEventosContext context)
        {
            this._context = context;
            //No EventoService.cs (do Application) o "UpdateEvento" faz primeiro um get e depois um update
            //O get segura o elemento (evento) e o update não consegue mexer. PARA SOLUCIONAR:
            //O "AsNoTracking" serve para não segurar os elementos (eventos), pode fazer em cada lugar como fiz, ou só aqui (ai fica geral no EventoPersistence), descomentando a linha abaixo
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Lote> GetLoteByIdsAsync(int eventoId, int id)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking()
                          .Where(lote => lote.EventoId == eventoId && lote.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Lote[]> GetLotesByEventoIdAsync(int eventoId)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking()
                          .Where(lote => lote.EventoId == eventoId);

            return await query.ToArrayAsync();
        }
    }
}