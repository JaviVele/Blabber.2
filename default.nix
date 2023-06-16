{ pkgs, ... }:

let
  frontend = pkgs.nixpacks.build {
    name = "frontend";
    src = ./.;
    buildCommand = "ng build --prod";
  };

  backend = pkgs.nixpacks.build {
    name = "backend";
    src = ./.;
    buildCommand = "sails lift";
  };
in
{
  apps = [
    frontend
    backend
  ];
}
