using capstoneBackend.Middleswares;
using capstoneBackend.Repository;
using capstoneBackend.Repository.Interfaces;
using capstoneBackend.Services;
using capstoneBackend.Services.Interfaces;
using capstoneBackend.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
builder.Services.AddScoped<ITouristRepo, TouristRepo>();
builder.Services.AddTransient<ITouristService, TouristServiceImpl>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddTransient<IUserService, UserSericeImpl>();

//required to do bypass CORS error
builder.Services.AddCors((o) =>
{
    o.AddPolicy("corsPolicy", b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseMiddleware<JwtAuthMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("corsPolicy");

app.MapControllers();

app.Run();
