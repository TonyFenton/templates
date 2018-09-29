<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TemplateRepository")
 */
class Template
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $text;

    /**
     * @ORM\Column(type="text")
     */
    private $variables = '[]';

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Folder", inversedBy="templates")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank()
     */
    private $folder;

    /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     * @Assert\Length(max=1000)
     */
    private $description;

    public function getId()
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText($text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getVariables(): ?string
    {
        return $this->variables;
    }

    public function getDecodedVariables(): array
    {
        return json_decode($this->variables);
    }

    public function setVariables($variables): self
    {
        if (null === $variables) {
            $variables = '[]';
        }
        $this->variables = $variables;

        return $this;
    }

    /**
     * Get text in combination with variables
     * e.g. [['content' => 'Hey ', 'variableId' => false], ['content' => false, 'variableId' => 0]]
     * @return array
     */
    public function getTextToView(): array
    {
        $text = [['content' => $this->getText(), 'variableId' => false]];
        foreach ($this->getDecodedVariables() as $id => $variable) {
            $textTemp = [];
            foreach ($text as $item) {
                if (false === $item['variableId']) {
                    $snippets = explode('{'.$variable->name.'}', $item['content']);
                    foreach ($snippets as $snippet) {
                        if ('' !== $snippet) {
                            $textTemp[] = ['content' => $snippet, 'variableId' => false];
                        }
                        $textTemp[] = ['content' => false, 'variableId' => $id];
                    }
                    array_pop($textTemp);
                } else {
                    $textTemp[] = $item;
                }
            }
            $text = $textTemp;
        }

        return $text;
    }

    public function getFolder(): ?Folder
    {
        return $this->folder;
    }

    public function setFolder(?Folder $folder): self
    {
        $this->folder = $folder;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
