<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response; // Importante para usar códigos HTTP estándar
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request, 
        UserRepository $userRepository, 
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse
    {
        // 1. INPUT: Decodificar el JSON de entrada
        // En un negocio, esto permite recibir datos desde Web, App móvil o API externa.
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // 2. VALIDACIÓN BÁSICA
        if (empty($email) || empty($password)) {
            return $this->json([
                'status' => 'error',
                'message' => 'Faltan credenciales (email o contraseña).'
            ], Response::HTTP_BAD_REQUEST);
        }

        // 3. LÓGICA DE NEGOCIO (Buscar Usuario)
        $user = $userRepository->findOneBy(['email' => $email]);

        // 4. SEGURIDAD: Verificación de Contraseña
        // Importante: Si el usuario no existe O la contraseña falla, devolvemos el MISMO error.
        // Esto evita que un hacker sepa qué emails están registrados en tu base de datos.
        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return $this->json([
                'status' => 'error',
                'message' => 'Credenciales inválidas.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // 5. RESPUESTA EXITOSA (Escalable)
        // Aquí preparamos una estructura de datos limpia.
        // NOTA PARA FUTURO NEGOCIO: Aquí es donde generaremos el JWT (Json Web Token).
        // Por ahora, para el MVP, devolvemos los datos básicos del usuario.
        
        return $this->json([
            'status' => 'success',
            'message' => 'Bienvenido a Moodify',
            'data' => [
                'userId' => $user->getId(),
                'email' => $user->getEmail(),
                // 'roles' => $user->getRoles(), // Descomentar si necesitas gestionar permisos de administrador
                // 'apiToken' => 'token_placeholder_para_futuro' 
            ]
        ], Response::HTTP_OK);
    }
}
