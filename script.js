document.addEventListener('DOMContentLoaded', function() {
    const personalInfoForm = document.getElementById('personal-info-form');
    const initialForm = document.getElementById('initial-form');
    const questionsContainer = document.getElementById('questions-container');
    const greeting = document.getElementById('greeting');
    const quizForm = document.getElementById('quiz-form');
    const submitButton = document.getElementById('submit-button');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const restartButton = document.getElementById('restart-button');
    let studentName = ""; // Variable para almacenar el nombre completo del estudiante

    // Nuevas preguntas y recomendaciones (10 preguntas)
	// Nuevas preguntas y recomendaciones (10 preguntas)
const questions = [
    { question: "¿Te sientes calmado últimamente?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Considera practicar técnicas de relajación como la meditación." },
    { question: "¿has podido conciliar sueño facilmente?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Podrías beneficiarte de una rutina de sueño más estructurada." },
    { question: "¿Te sientes apoyado por tus amigos o familiares?", answers: ["Sí", "No", "A veces"], recommendation: "Hablar con alguien de confianza puede ser útil." },
    { question: "¿Te has llegado a sentir muy en paz ultimamente?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Te aconsejo explorar técnicas de manejo de paz." },
    { question: "¿Puedes manejar tus emociones adecuadamente?", answers: ["Sí", "No", "A veces"], recommendation: "Considera buscar estrategias para la gestión emocional." },
    { question: "¿Te sientes bien en tus actividades diarias?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Asegúrate de tomar descansos regulares." },
    { question: "¿Tienes libertad para concentrarte?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Intenta practicar la atención plena para mejorar tu enfoque." },
    { question: "¿Te sientes satisfecho con tu vida social?", answers: ["Sí", "No", "A veces"], recommendation: "Intenta hacer nuevas conexiones sociales." },
    { question: "¿Sientes que tienes suficiente tiempo para ti mismo?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Considera programar tiempo personal en tu agenda." },
    { question: "¿Tienes metas claras en tu vida?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Es útil escribir tus metas y revisar tu progreso." },
    { question: "¿Has dedicado tiempo a realizar actividades en donde no haya tecnología?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Busca espacios como parques de diversión, jardines o demás para encontrar calma; incluso un paseo corto ayuda a reducir el estrés." },
    { question: "¿Te permites expresarte a cualquiera de tus emociones y también las negativas?", answers: ["Sí", "No", "Casi nunca"], recommendation: "En lo posible, practica con un diario donde todos los días o al menos tres veces a la semana escribas sobre tu día o tus emociones." },
    { question: "¿Te tomas descansos regulares cuando trabajas o estudias?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Podrías usar la técnica de 25 minutos de trabajo y 5 minutos de descanso; también puede ser un pequeño break." },
    { question: "¿Haces ejercicio mínimo tres veces por semana?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Intenta realizar caminatas en la mañana o 30 minutos de ejercicio suave en casa por la noche." },
    { question: "¿Tienes alguna actividad a realizar por diversión o para aprender?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Puedes explorar actividades como pintar, escribir, cocinar, leer, etc.; eso mantiene tu mente ocupada y calma el estrés." },
    { question: "¿Te sientes satisfecho/a con tu alimentación diaria?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Intenta llevar un cierto horario para la comida; es importante comer de manera equilibrada, ya que una mala alimentación puede causar enfermedades físicas y también estrés, mal humor y malos hábitos." },
    { question: "¿Te sientes inspirado/a o creativo/a en alguna parte de tu vida?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Encuentra algo que te apasione o en lo que seas bueno; abre tu mente a nuevos intereses y aumenta tu creatividad." },
    { question: "¿Te has permitido reír bastante últimamente?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Busca algo que te haga reír, ya sean videos o programas; la idea es ser feliz un rato." },
    { question: "¿Sientes que estás reconociendo tus logros, incluyendo los más pequeños?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Deberías tener en cuenta los logros, por pequeños que sean; eso aumenta tu autoestima y ayuda a apreciar tu progreso personal." },
    { question: "¿Has dedicado momentos de soledad saludable?", answers: ["Sí", "No", "Casi nunca"], recommendation: "Busca un reto para estar solo/a y disfrutar de un rato de paz interior." }
];



    // Al enviar el formulario de información personal
    personalInfoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        // Almacenar el nombre completo
        studentName = `${name} ${surname}`;
        // Mostrar el saludo
        greeting.innerHTML = `<h2>¡Hola, ${name} ${surname}!</h2><p>A continuación, por favor responde las siguientes preguntas:</p>`;
        greeting.classList.remove('hidden');

        // Ocultar el formulario inicial
        initialForm.classList.add('hidden');

        // Mostrar las preguntas
        questionsContainer.classList.remove('hidden');

        // Generar preguntas dinámicamente
        questions.forEach((questionData, index) => {
            const questionHTML = `<fieldset>
                <legend>${questionData.question}</legend>
                ${questionData.answers.map(answer => `
                    <label>
                        <input type="radio" name="question${index}" value="${answer}" required>
                        ${answer}
                    </label>
                `).join("")}
            </fieldset>`;
            quizForm.innerHTML += questionHTML;
        });

        // Escuchar cambios en el formulario
        quizForm.addEventListener('change', function(event) {
            const target = event.target;
            if (target.tagName === 'INPUT' && target.type === 'radio') {
                handleResponseChange(target);
            }
        });
    });

    // Función para manejar el cambio de respuesta
    function handleResponseChange(target) {
        const questionIndex = target.name.replace('question', '');
        const questionText = questions[questionIndex].question;

        if (target.value === "No" || target.value === "Casi nunca") {
            const recommendation = questions[questionIndex].recommendation;
            showAlert(`Para la pregunta "${questionText}", ${recommendation}`);
        }
    }

    // Función para mostrar un alert
    function showAlert(message) {
        alert(message);
    }

    // Al enviar las respuestas del quiz
    submitButton.addEventListener('click', function() {
        const formData = new FormData(quizForm);
        const responses = [];

        // Recoger las respuestas
        for (let [key, value] of formData.entries()) {
            responses.push(value);
        }

        // Verificar que todas las preguntas tengan una respuesta
        if (responses.length === questions.length) {
            // Generar la recomendación en base a las respuestas
            const recommendation = generateRecommendation(responses);

            // Mostrar resultado y generar el archivo para descargar
            resultText.innerHTML = recommendation; // Cambiar a innerHTML
            resultContainer.classList.remove('hidden');
            questionsContainer.classList.add('hidden');

            downloadFile(recommendation, 'recomendacion.txt');
        } else {
            alert("Por favor, responde todas las preguntas.");
        }
    });

// Función para generar recomendación basada en respuestas
function generateRecommendation(responses) {
    const respuestas = questions.map((questionData, index) => 
        `${questionData.question}<br>Respuesta: ${responses[index]}`
    ).join("<br><br>");

    const countNegatives = responses.filter(response => response === "No" || response === "Casi nunca").length;

    let recomendacion = "<b>Recomendación personalizada:</b><br>Recuerda tomarte tiempo para ti y hablar sobre tus emociones con personas de confianza.";

    // Recomendaciones según el número de respuestas negativas
    switch (countNegatives) {
        case 0:
            recomendacion += "<br>¡Excelente! Te recomendamos dibujar algo que te inspire, como un paisaje o una escena feliz.";
            break;
        case 2:
            recomendacion += "<br>Es importante que tomes un momento para relajarte. Prueba dibujar algo simple, como tu lugar favorito.";
            break;
        case 4:
            recomendacion += "<br>Considera dedicar tiempo a la relajación. Un dibujo que represente calma, como un mar en calma, puede ayudarte.";
            break;
        case 6:
            recomendacion += "<br>Es posible que necesites un poco más de tiempo para ti. Intenta dibujar algo que te haga reír o que te recuerde momentos felices.";
            break;
        case 8:
            recomendacion += "<br>Podrías beneficiarte de una rutina más estructurada. Considera dibujar un un comic o algo que te permita expresarte.";
            break;
        case 10:
            recomendacion += "<br>Es fundamental que busques formas de manejar el estrés. Un dibujo que represente tus emociones podría ser algun pesonaje de caricatura.";
            break;
        default:
            recomendacion += "<br>Dedica tiempo a reflexionar sobre tus emociones y dibuja algo que represente cómo te sientes.";
    }

    return `Estas son tus respuestas:<br>${respuestas}<br><br>${recomendacion}`;
}



    // Reiniciar la encuesta
    restartButton.addEventListener('click', function() {
        window.location.reload(); // Recargar la página para empezar de nuevo
    });
});

