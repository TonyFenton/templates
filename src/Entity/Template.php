<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

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
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     */
    private $text;

    /**
     * @ORM\Column(type="text")
     */
    private $variables = '[]';

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
        if (null !== $variables) {
            $this->variables = $variables;
        }

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
}
