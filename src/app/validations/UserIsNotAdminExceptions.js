export default class UserIsNotAdminExceptions extends Error {
  constructor() {
    super();
    this.message = 'Apenas o administrador pode prosseguir com esta ação';
  }
}
