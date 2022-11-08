namespace ProEventos.Persistence.Models
{
    public class PageParams
    {
        public const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        public int pageSize = 10;
        public int PageSize { 
            get {return pageSize;}
            set {pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
        //BEGIN
        public string Term { get; set; } = string.Empty;
        //Preciso inicializar com o Empty toda vez para que ele nunca seja nulo
        //Pq se for nulo, vai causar problema nas queries futuras
        //END
    }
}