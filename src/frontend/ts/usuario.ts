class Usuario{
  private nombre: string;
  private rol: string;
  private password: string;
  
  constructor(nombre: string, rol: string, passwornd: string) {
      this.nombre = nombre;
      this.password = passwornd;
      this.rol = rol;
  }

  public mostrar():string {
    return `${this.nombre} - ${this.rol}`; 
  }
}