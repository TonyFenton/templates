<?php

namespace App\Controller;

use App\Repository\FolderRepository;
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

    public function sideMenu(FolderRepository $folderRepository)
    {
        return $this->render('user/_side_menu.html.twig', [
            'folders' => $folderRepository->findSideMenu($this->getUser()),
        ]);
    }
}
