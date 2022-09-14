using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private IEnumerable<Evento> _eventos = new Evento[] {
                new Evento(){
                    EventoId = 1,
                    Tema = "Angular e C",
                    Local = "BSB",
                    Lote = "1 lote",
                    QtdPessoas = 250,
                    DataEvento = "01/02/2003",
                    ImagemURL = "foto.png"
                },
                new Evento(){
                    EventoId = 2,
                    Tema = "CSS e CSharp",
                    Local = "SP",
                    Lote = "2 lote",
                    QtdPessoas = 500,
                    DataEvento = "10/08/2022",
                    ImagemURL = "foto2.png"
                }
            };
        public EventoController()
        {
        }

        [HttpGet]

        public IEnumerable<Evento> Get()
        {
            return _eventos;
        }

        [HttpGet("{id}")]

        public IEnumerable<Evento> GetById(int id)
        {
            return _eventos.Where(e => e.EventoId == id);
        }

        [HttpPost]

        public string Post()
        {
            return "retorno de post";
        }

        [HttpPut("{id}")]

        public string Put(int id)
        {
            return $"Exemplo de put id = {id}";
        }

        [HttpDelete("{id}")]

        public string Delete(int id)
        {
            return $"Exemplo de delete id = {id}";
        }
    }
}
