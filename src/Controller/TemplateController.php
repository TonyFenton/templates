<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TemplateController extends AbstractController
{
    /**
     * @Route("/template", name="template", methods={"GET"})
     */
    public function index()
    {
        return $this->render('template/index.html.twig');
    }
}
