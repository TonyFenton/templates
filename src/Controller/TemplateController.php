<?php

namespace App\Controller;

use App\Entity\Template;
use App\Form\TemplateType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TemplateController extends AbstractController
{
    /**
     * Display a template
     * @Route("/template/{id}", name="template", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function index(EntityManagerInterface $em, int $id)
    {
        $template = $em->getRepository(Template::class)->find($id);

        if (null === $template) {
            throw $this->createNotFoundException('No template found');
        }

        return $this->render('template/index.html.twig', [
            'template' => $template,
        ]);
    }

    /**
     * Create a template
     * @Route("/template/new", name="template_new", methods={"GET", "POST"})
     */
    public function new(Request $request, EntityManagerInterface $em)
    {
        $template = new Template();
        $form = $this->createForm(TemplateType::class, $template);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $em->persist($template);
            $em->flush();

            return $this->redirectToRoute('template_new');
        }

        return $this->render('template/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

}
