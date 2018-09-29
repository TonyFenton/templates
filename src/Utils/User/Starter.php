<?php

namespace App\Utils\User;

use App\Entity\AppUser;
use App\Entity\Folder;
use App\Entity\Template;
use Doctrine\ORM\EntityManagerInterface;

class Starter
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param AppUser $user
     */
    public function createExample(AppUser $user)
    {
        $folder = new Folder();
        $folder->setUser($user);
        $folder->setName('Example');

        $template = new Template();
        $template->setName('Alice and sth');
        $template->setVariables('[{"desc":"e.g. cat","name":"sth","type":"text","value":""}]');
        $template->setDescription('This is just example.');
        $template->setText('Alice has a {sth}. The {sth} is red.');
        $folder->addTemplate($template);

        $this->entityManager->persist($folder);
    }
}