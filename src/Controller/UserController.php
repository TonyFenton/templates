<?php

namespace App\Controller;

use App\Entity\Template;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserController extends Controller
{
    /**
     * @Route("/user", name="user")
     */
    public function index()
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    public function sideMenu(EntityManagerInterface $em)
    {
        $templates = $em->getRepository(Template::class)->findAll();

        return $this->render('user/_side_menu.html.twig', [
            'templates' => $templates,
        ]);
    }
}
