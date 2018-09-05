<?php

namespace App\Form;

use App\Entity\Folder;
use App\Entity\Template;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TemplateType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $user = $options['user'];

        $builder
            ->add('name')
            ->add('folder', EntityType::class, [
                'class' => Folder::class,
                'query_builder' => function (EntityRepository $er) use ($user)  {
                    return $er->createQueryBuilder('f')
                        ->andWhere('f.user = :user')
                        ->setParameter('user', $user)
                        ->orderBy('f.name', 'ASC');
                },
            ])
            ->add('text', null, [
                'label' => false,
                'attr' => ['placeholder' => 'Enter text with variables in curly brackets, e.g. Alice has a {sth}. The {sth} is red.'],
                'trim' => false,
            ])
            ->add('variables', HiddenType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults([
                'data_class' => Template::class,
            ])
            ->setRequired('user');
    }
}
