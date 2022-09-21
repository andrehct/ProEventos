using System.Threading.Tasks;
using ProEventos.Persistence.InterfacesPersistencia;

namespace ProEventos.Persistence
{
    public class GeralPersistence : IGeralPersist
    {
        private readonly ProEventosContext _context;
        public GeralPersistence(ProEventosContext context)
        {
            this._context = context;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }

        
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}