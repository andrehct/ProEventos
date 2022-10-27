using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Domain.Identity;

namespace ProEventos.Persistence
{
    public class ProEventosContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>,
                                                       UserRole, IdentityUserLogin<int>,
                                                       IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options){}
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Abaixo estarão duas formas diferentes de fazer a mesma coisa
            //Forma 1:
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole => {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});
                userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId).IsRequired();
                userRole.HasOne(ur => ur.User).WithMany(u => u.UserRoles).HasForeignKey(ur => ur.UserId).IsRequired();
            });

            //Forma 2:
            modelBuilder.Entity<PalestranteEvento>().HasKey(PE => new {PE.EventoId, PE.PalestranteId});
            //BEGIN - Necessário pois a tabela de rede social tem 2 FKs
            //Se deletar um Evento OU Palestrante, tem que tirar as redes dele.
            modelBuilder.Entity<Evento>().HasMany(e => e.RedesSociais)
                                         .WithOne(rs => rs.Evento)
                                         .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Palestrante>().HasMany(e => e.RedesSociais)
                                         .WithOne(rs => rs.Palestrante)
                                         .OnDelete(DeleteBehavior.Cascade);
            //END
        }
    }
}