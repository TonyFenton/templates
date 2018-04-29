<?php

namespace App\Controller;

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
                ['variableID' => false, 'content' => ',
Fantastic! Are you free on ' ],
                ['variableID' => 1, 'content' => ''],
                ['variableID' => false, 'content' => ' at '],
                ['variableID' => 2, 'content' => ''],
                ['variableID' => false, 'content' => '? If not, please suggest a couple times  that work for you.
Looking forward to meeting.'],
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
}
