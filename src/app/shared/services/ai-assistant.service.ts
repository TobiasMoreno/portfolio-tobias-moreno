import { Injectable } from '@angular/core';

export interface AIResponse {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {
  private responses: AIResponse[] = [
    {
      question: '¿Quién es Tobias Moreno?',
      answer: '¡Hola! Soy Tobias Moreno, un desarrollador de software apasionado por crear soluciones innovadoras. Me especializo en desarrollo web full-stack con tecnologías modernas como Angular, Spring Boot, y bases de datos SQL. Me encanta aprender nuevas tecnologías y enfrentar desafíos técnicos que me permitan crecer profesionalmente.'
    },
    {
      question: '¿Cuáles son sus habilidades?',
      answer: 'Mis habilidades principales incluyen:\n\n• Desarrollo Frontend: Angular, TypeScript, HTML5, CSS3, JavaScript\n• Desarrollo Backend: Java, Spring Boot, Spring Security\n• Bases de Datos: SQL, MySQL, PostgreSQL\n• Herramientas: Git, Docker, Maven, npm\n• Metodologías: Scrum, Agile, TDD\n• Soft Skills: Trabajo en equipo, comunicación efectiva, resolución de problemas'
    },
    {
      question: '¿Qué proyectos ha desarrollado?',
      answer: 'He desarrollado varios proyectos interesantes:\n\n• Portfolio Personal (este sitio): Desarrollado con Angular 18\n• Calculadora Angular: Aplicación web con funcionalidades matemáticas avanzadas\n• Landing Page Angular 17: Sitio web moderno y responsivo\n• Proyectos con Spring Boot: APIs RESTful y aplicaciones empresariales\n• Proyectos de e-commerce y gestión de contenido\n\nTodos mis proyectos están disponibles en mi GitHub y demuestran mi capacidad para crear soluciones completas y escalables.'
    },
    {
      question: '¿Dónde puedo contactarlo?',
      answer: '¡Me encantaría conectar contigo! Puedes contactarme a través de:\n\n• WhatsApp: Haciendo clic en el botón flotante verde\n• LinkedIn: Busca "Tobias Moreno" en LinkedIn\n• Email: A través del formulario de contacto en esta página\n• GitHub: Para ver mis proyectos y contribuciones\n\nEstoy siempre abierto a nuevas oportunidades, colaboraciones y conversaciones sobre tecnología.'
    },
    {
      question: '¿Qué tecnologías usa Tobias?',
      answer: 'Mi stack tecnológico incluye:\n\n🟢 Frontend:\n• Angular (17-18), TypeScript, RxJS\n• HTML5, CSS3, JavaScript ES6+\n• Bootstrap, Material Design\n\n🔵 Backend:\n• Java 8-17, Spring Framework\n• Spring Boot, Spring Security\n• JPA/Hibernate, Maven\n\n🗄️ Bases de Datos:\n• MySQL, PostgreSQL\n• SQL Server, MongoDB\n\n🛠️ Herramientas:\n• Git, GitHub, Docker\n• VS Code, IntelliJ IDEA\n• Postman, Swagger\n\nEstoy constantemente aprendiendo nuevas tecnologías para mantenerme actualizado.'
    }
  ];

  constructor() { }

  getResponses(): AIResponse[] {
    return this.responses;
  }

  getResponseByQuestion(question: string): AIResponse | undefined {
    return this.responses.find(response => response.question === question);
  }
} 