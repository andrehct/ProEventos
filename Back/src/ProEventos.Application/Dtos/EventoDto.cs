using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        public string Local { get; set; }

        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
        MinLength(4, ErrorMessage = "O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(50, ErrorMessage = "O campo {0} deve ter no máximo 50 caracteres.")]
        public string Tema { get; set; }

        public int QtdPessoas { get; set; }

        public string ImagemURL { get; set; }

        public string Telefone { get; set; }

        [EmailAddress(ErrorMessage = "Favor passar um email válido.")]
        public string Email { get; set; }

        public int UserId { get; set; }

        public UserDto UserDto { get; set; }

        public IEnumerable<LoteDto> Lotes { get; set; }

        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }

        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}