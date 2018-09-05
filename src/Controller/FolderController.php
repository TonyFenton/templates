<?php

namespace App\Controller;

use App\Entity\Folder;
use App\Form\FolderType;
use App\Repository\FolderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/folder")
 */
class FolderController extends Controller
{
    /**
     * @Route("/", name="folder_index", methods="GET")
     */
    public function index(FolderRepository $folderRepository): Response
    {
        return $this->render('folder/index.html.twig', ['folders' => $folderRepository->findBy(['user' => $this->getUser()])]);
    }

    /**
     * @Route("/new", name="folder_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $folder = new Folder();
        $folder->setUser($this->getUser());
        $form = $this->createForm(FolderType::class, $folder);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($folder);
            $em->flush();

            $this->addFlash('success', 'The folder has been created.');

            return $this->redirectToRoute('folder_index');
        }

        return $this->render('folder/new.html.twig', [
            'folder' => $folder,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="folder_content", methods="GET")
     */
    public function content(Folder $folder)
    {
        $this->denyAccessUnlessGranted('show', $folder);

        return $this->render('folder/content.html.twig', ['folder' => $folder]);
    }

    /**
     * @Route("/{id}/edit", name="folder_edit", methods="GET|POST")
     */
    public function edit(Request $request, Folder $folder): Response
    {
        $this->denyAccessUnlessGranted('edit', $folder);

        $form = $this->createForm(FolderType::class, $folder);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', 'Your changes have been saved.');

            return $this->redirectToRoute('folder_index');
        }

        return $this->render('folder/edit.html.twig', [
            'folder' => $folder,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="folder_delete", methods="DELETE")
     */
    public function delete(Request $request, Folder $folder): Response
    {
        if ($this->isCsrfTokenValid('delete'.$folder->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($folder);
            $em->flush();

            $this->addFlash('success', 'The folder has been deleted.');
        }

        return $this->redirectToRoute('folder_index');
    }
}
