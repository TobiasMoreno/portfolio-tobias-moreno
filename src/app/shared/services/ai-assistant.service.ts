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
      answer: '👋 ¡Hola! Soy <strong>Tobias Moreno</strong>, un desarrollador de software apasionado por crear <em>soluciones innovadoras</em>.\n\n💻 Me especializo en desarrollo web <strong>full-stack</strong> con tecnologías modernas como <em>Angular</em>, <em>Spring Boot</em>, y bases de datos <em>SQL</em>.\n\n🚀 Me encanta aprender nuevas tecnologías y enfrentar desafíos técnicos que me permitan crecer profesionalmente.'
    },
    {
      question: '¿Cuales son tus virtudes y defectos?',
      answer: '✨ <strong>Fortalezas:</strong>\n\n🚀 <em>Proactividad:</em> Siempre busco mejorar procesos y propongo soluciones. Por ejemplo, creé componentes reutilizables que simplificaron el código del equipo.\n\n💡 <em>Pensamiento crítico:</em> Analizo y debato mejoras con el equipo para mantener código limpio.\n\n🤝 <em>Comunicación:</em> Me gusta compartir ideas y trabajar en conjunto.\n\n📝 <strong>Área de mejora:</strong>\n\n🎯 <em>Perfeccionismo:</em> A veces me enfoco demasiado en detalles menores. Estoy trabajando en priorizar valor sobre perfección.\n\n👥 <em>Delegación:</em> También estoy aprendiendo a delegar más. Antes intentaba resolver todo por mi cuenta, pero entendí que compartir responsabilidades mejora los tiempos y enriquece al equipo.'
    },
    {
      question: '¿Cuáles son sus habilidades?',
      answer: '🛠️ <strong>Mis habilidades principales incluyen:</strong>\n\n🎨 <em>Desarrollo Frontend:</em> Angular, TypeScript, HTML5, CSS3, JavaScript\n\n⚙️ <em>Desarrollo Backend:</em> Java, Spring Boot, Spring Security\n\n🗄️ <em>Bases de Datos:</em> SQL, MySQL, PostgreSQL\n\n🔧 <em>Herramientas:</em> Git, Docker, Maven\n\n📋 <em>Metodologías:</em> Scrum y Agile\n\n🤝 <em>Soft Skills:</em> Trabajo en equipo, comunicación efectiva, resolución de problemas'
    },
    {
      question: '¿Qué proyectos ha desarrollado?',
      answer: '💼 <strong>He desarrollado varios proyectos interesantes:</strong>\n\n🎯 <em>Portfolio Personal</em> (este sitio): Desarrollado con <strong>Angular 18</strong>\n\n🧮 <em>Calculadora Angular:</em> Aplicación web con funcionalidades matemáticas avanzadas\n\n🌐 <em>Landing Page Angular 17:</em> Sitio web moderno y responsivo\n\n⚡ <em>Proyectos con Spring Boot:</em> APIs RESTful y aplicaciones empresariales\n\n🛒 <em>Proyectos de e-commerce</em> y gestión de contenido\n\n📂 Todos mis proyectos están disponibles en mi <strong>GitHub</strong> y demuestran mi capacidad para crear <em>soluciones completas y escalables</em>.'
    },
    {
      question: '¿Dónde puedo contactarlo?',
      answer: '🤝 <strong>¡Me encantaría conectar contigo!</strong> Puedes contactarme a través de:\n\n💬 <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tobiasmoreno.tm.21@gmail.com&su=%C2%A1Hola%20Tobias!%20Me%20gustar%C3%ADa%20contactarte&body=Hola%20Tobias,%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo%20para..." target="_blank"><em>Gmail</em></a>\n\n💼 <a href="https://www.linkedin.com/in/tobiasmoreno/" target="_blank"><em>LinkedIn</em></a>\n\n📂 <a href="https://github.com/TobiasMoreno" target="_blank"><em>GitHub</em></a>\n\n🚀 Estoy siempre abierto a <strong>nuevas oportunidades</strong>, <em>colaboraciones</em> y conversaciones sobre tecnología.'
    },
    {
      question: '¿Qué tecnologías usa Tobias?',
      answer: '🛠️ <strong>Mi stack tecnológico incluye:</strong>\n\n🎨 <em>Frontend:</em>\n• <strong>Angular (17-18)</strong>, TypeScript, RxJS\n• HTML5, CSS3, JavaScript ES6+\n• Bootstrap, Tailwind, Material Design\n\n⚙️ <em>Backend:</em>\n• <strong>Java 8-17</strong>, Spring Framework\n• Spring Boot, Spring Security\n• JPA/Hibernate, Maven\n\n🗄️ <em>Bases de Datos:</em>\n• MySQL, PostgreSQL\n• SQL Server, MongoDB\n\n🔧 <em>Herramientas:</em>\n• Git, GitHub, Docker\n• VS Code, IntelliJ IDEA\n• Postman, Swagger\n\n📚 Estoy constantemente aprendiendo <em>nuevas tecnologías</em> para mantenerme actualizado.'
    },

  ];

  getResponses(): AIResponse[] {
    return this.responses;
  }

  getResponseByQuestion(question: string): AIResponse | undefined {
    return this.responses.find(response => response.question === question);
  }
} 