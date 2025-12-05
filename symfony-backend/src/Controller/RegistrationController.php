<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{
    // Propiedades para guardar las herramientas que vamos a usar
    private $entityManager;
    private $passwordHasher;

    // Constructor: Symfony "inyectará" automáticamente las herramientas que pidamos
    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        // 1. Decodificar el JSON que envía Angular (o Postman)
        // Usamos ->toArray() que es el método nuevo y más fácil
        $data = $request->toArray();

        // 2. Crear un nuevo objeto User
        $user = new User();
        $user->setEmail($data['email']);

        // 3. Hashear (codificar) la contraseña (¡NUNCA guardarla en texto plano!)
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $data['password']
        );
        $user->setPassword($hashedPassword);

        // 4. Guardar el usuario en la Base de Datos
        $this->entityManager->persist($user); // Prepara el guardado
        $this->entityManager->flush();      // Ejecuta el guardado

        // 5. Devolver una respuesta de éxito
        return $this->json([
            'message' => 'User created successfully'
        ], Response::HTTP_CREATED); // HTTP 201 = Creado
    }
}