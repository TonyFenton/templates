<?php

namespace App\Entity;

use FOS\UserBundle\Model\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class AppUser extends User
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
}