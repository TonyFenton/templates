<?php

namespace App\Controller;

use App\Entity\AppUser;
use App\Repository\FolderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function homepage(FolderRepository $folderRepository)
    {
        if ($this->getUser() instanceof AppUser) {
            return $this->render('user/homepage.html.twig', [
                'folders' => $folderRepository->findTree($this->getUser()),
            ]);
        }

        return $this->render('default/homepage.html.twig');
    }
}
