<?php

namespace App\Tests\Entity;

use App\Entity\Template;
use PHPUnit\Framework\TestCase;

class TemplateTest extends TestCase
{
    /**
     * @dataProvider getTextToViewData
     *
     * @param string $text
     * @param array $variables
     * @param array $expected
     */
    public function testGetTextToView(string $text, array $variables, array $expected)
    {
        $temlpate = new Template();
        $temlpate->setText($text);
        $temlpate->setVariables(json_encode($variables));

        $this->assertSame($expected, $temlpate->getTextToView());
    }

    public function getTextToViewData()
    {
        yield [
            'text' => 'Hey {name}, this is my {email}.',
            'variables' => [
                ['name' => 'name'],
                ['name' => 'email'],
            ],
            'expected' => [
                ['content' => 'Hey ', 'variableId' => false],
                ['content' => false, 'variableId' => 0],
                ['content' => ', this is my ', 'variableId' => false],
                ['content' => false, 'variableId' => 1],
                ['content' => '.', 'variableId' => false],
            ],
        ];
        yield [
            'text' => '{name}Hey {name}{name}, this {email} is{var} my {name}{email}.{name}',
            'variables' => [
                ['name' => 'email'],
                ['name' => 'name'],
                ['name' => 'var'],
                ['name' => 'name'],
                ['name' => 'email'],
            ],
            'expected' => [
                ['content' => false, 'variableId' => 1],
                ['content' => 'Hey ', 'variableId' => false],
                ['content' => false, 'variableId' => 1],
                ['content' => false, 'variableId' => 1],
                ['content' => ', this ', 'variableId' => false],
                ['content' => false, 'variableId' => 0],
                ['content' => ' is', 'variableId' => false],
                ['content' => false, 'variableId' => 2],
                ['content' => ' my ', 'variableId' => false],
                ['content' => false, 'variableId' => 1],
                ['content' => false, 'variableId' => 0],
                ['content' => '.', 'variableId' => false],
                ['content' => false, 'variableId' => 1],
            ],
        ];
        yield [
            'text' => 'Hey {name}, this is my {email}.',
            'variables' => [],
            'expected' => [
                ['content' => 'Hey {name}, this is my {email}.', 'variableId' => false],
            ],
        ];
        yield [
            'text' => 'Hey {name}, this is my {email}.',
            'variables' => [
                ['name' => 'asdf'],
            ],
            'expected' => [
                ['content' => 'Hey {name}, this is my {email}.', 'variableId' => false],
            ],
        ];
    }
}