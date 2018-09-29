<?php

namespace App\EventSubscriber;

use App\Utils\User\Starter;
use FOS\UserBundle\Event\UserEvent;
use FOS\UserBundle\FOSUserEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class FosUserSubscriber implements EventSubscriberInterface
{
    /**
     * @var Starter
     */
    private $starter;

    public function __construct(Starter $starter)
    {
        $this->starter = $starter;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            FOSUserEvents::REGISTRATION_COMPLETED => 'onRegistrationCompleted',
        ];
    }

    public function onRegistrationCompleted(UserEvent $event)
    {
        $this->starter->createExample($event->getUser());
    }
}
