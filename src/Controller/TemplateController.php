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
     * @Route("/template", name="template", methods={"GET"})
     */
    public function index()
    {
        $template = [
            'name' => 'Meeting',
            'processedText' => [
                ['variableID' => false, 'content' => 'Hi '],
                ['variableID' => 0, 'content' => ''],
                [
                    'variableID' => false,
                    'content' => ',
Fantastic! Are you free on ',
                ],
                ['variableID' => 1, 'content' => ''],
                ['variableID' => false, 'content' => ' at '],
                ['variableID' => 2, 'content' => ''],
                [
                    'variableID' => false,
                    'content' => '? If not, please suggest a couple times  that work for you.
Looking forward to meeting.',
                ],
            ],
            'variables' => [
                ["desc" => "", "name" => "name", "type" => "text", "value" => ""],
                ["desc" => "", "name" => "day of week", "type" => "text", "value" => ""],
                ["desc" => "", "name" => "time", "type" => "text", "value" => ""],
            ],
        ];

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
