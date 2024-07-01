const validations = (form) => {
    let errors = {};
  
    const regexName = /^([a-zA-Z ]+)$/i;
  
    // Validaciones para el nombre
    if (!form.name.trim()) {
      errors.name = "Name field is required";
    } else if (!regexName.test(form.name)) {
      errors.name = "Name field only accepts letters";
    }
  
    // Validaciones para la descripción
    if (!form.description.trim()) {
      errors.description = "Description field is required";
    }
  
    // Validaciones para la fecha de lanzamiento
    if (!form.released) {
      errors.released = "Released date field is required";
    }
  
    // Validaciones para la calificación
    if (!form.rating) {
      errors.rating = "Rating field is required";
    } else if (form.rating < 0 || form.rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }
  
    // Validaciones para las plataformas
    if (form.platforms.length === 0) {
      errors.platforms = "At least one platform must be selected";
    }
  
    // Validaciones para los géneros
    if (form.genres.length === 0) {
      errors.genres = "At least one genre must be selected";
    }
  
    return errors;
  };
  
  export default validations;
  