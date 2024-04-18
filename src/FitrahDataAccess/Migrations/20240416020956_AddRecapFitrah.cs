using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitrahDataAccess.Migrations
{
    public partial class AddRecapFitrah : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recaps",
                columns: table => new
                {
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    Image = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recaps", x => x.Date);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recaps");
        }
    }
}
