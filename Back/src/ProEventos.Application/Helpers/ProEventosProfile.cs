using AutoMapper;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Domain.Identity;

namespace ProEventos.API.Helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile()
        {
            CreateMap<Evento, EventoDto>().ReverseMap(); //ReverseMap faz o mapeamento "ida e volta"
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteAddDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteUpdateDto>().ReverseMap();
            
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserUpdateDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}