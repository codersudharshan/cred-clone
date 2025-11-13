FROM maven:3.9.9-eclipse-temurin-17
WORKDIR /app
COPY . .
RUN chmod +x mvnw && ./mvnw clean package -DskipTests
CMD ["java", "-jar", "target/*.jar"]