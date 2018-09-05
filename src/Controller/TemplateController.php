<?php

namespace App\Controller;

use App\Entity\Folder;
use App\Entity\Template;
use App\Form\TemplateType;
use App\Repository\TemplateRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TemplateController extends AbstractController
{

    /**
     * @Route("/template", name="template_index", methods={"GET"})
     */
    public function index(TemplateRepository $templateRepository): Response
    {
        return $this->render('template/index.html.twig',
            ['templates' => $templateRepository->findByUser($this->getUser())]
        );
    }

    /**
     * Display a template
     * @Route("/template/{id}", name="template_show", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function show(int $id): Response
    {
        $em = $this->getDoctrine()->getManager();
        $template = $em->getRepository(Template::class)->find($id);

        $this->denyAccessUnlessGranted('show', $template->getFolder());

        if (null === $template) {
            throw $this->createNotFoundException('No template found');
        }

        return $this->render('template/show.html.twig', [
            'template' => $template,
        ]);
    }

    /**
     * Create a template
     * @Route("/template/new/folder/{id}", name="template_new_folder", methods={"GET", "POST"})
     * @Route("/template/new", name="template_new", methods={"GET", "POST"})
     */
    public function new(Request $request, Folder $folder = null): Response
    {
        $template = new Template();
        $template->setFolder($folder);
        $form = $this->createForm(TemplateType::class, $template, ['user' => $this->getUser()]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->persist($template);
            $em->flush();

            $this->addFlash('success', 'The template has been created.');

            return $this->redirectToRoute('template_show', ['id' => $template->getId()]);
        }

        return $this->render('template/new_edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * Edit a template
     * @Route("/template/{id}/edit", name="template_edit", methods={"GET", "POST"}, requirements={"id"="\d+"})
     */
    public function edit(Request $request, Template $id): Response
    {
        $em = $this->getDoctrine()->getManager();
        $template = $em->getRepository(Template::class)->find($id);

        if (null === $template) {
            throw $this->createNotFoundException('No template found');
        }

        $this->denyAccessUnlessGranted('edit', $template->getFolder());

        $form = $this->createForm(TemplateType::class, $template, ['user' => $this->getUser()]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();

            $this->addFlash('success', 'Your changes have been saved.');

            return $this->redirectToRoute('template_show', ['id' => $template->getId()]);
        }

        return $this->render('template/new_edit.html.twig', [
            'form' => $form->createView(),
            'template' => $template,
        ]);
    }

    /**
     * Delete a template
     * @Route("/template/{id}", name="template_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Template $template): Response
    {
        if ($this->isCsrfTokenValid('delete'.$template->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($template);
            $em->flush();

            $this->addFlash('success', 'The template has been deleted.');
        }

        return $this->redirectToRoute('template_index');
    }


}
