<?php

namespace App\Controller;

use App\Entity\AppUser;
use App\Repository\FolderRepository;
use App\Repository\TemplateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="homepage", methods={"GET"})
     * @Route("/template/{templateId}", name="template_show", methods={"GET"}, requirements={"templateId"="\d+"})
     */
    public function homepage(FolderRepository $folderRepository, TemplateRepository $templateRepository, int $templateId = null)
    {
        if ($this->getUser() instanceof AppUser) {

            if (null !== $templateId) {
                $template = $templateRepository->find($templateId);
                if (null === $template) {
                    throw $this->createNotFoundException();
                }
                $this->denyAccessUnlessGranted('show', $template->getFolder());
            }

            return $this->render('user/homepage.html.twig', [
                'folders' => $folderRepository->findTree($this->getUser()),
                'show_template_id' => $templateId,
            ]);
        }

        return $this->render('default/homepage.html.twig');
    }
}
