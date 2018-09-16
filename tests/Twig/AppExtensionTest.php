<?php

namespace App\Tests\Twig;

use PHPUnit\Framework\TestCase;
use App\Twig\AppExtension;

class AppExtensionTest extends TestCase
{
    private $appExtension = null;

    public function setUp()
    {
        $this->appExtension = new AppExtension();
    }

    public function testCutFilter_greater()
    {
        $this->assertSame('Lorem i...', $this->appExtension->cutFilter('Lorem ipsum dolor sit amet', 10));
    }

    public function testCutFilter_less()
    {
        $this->assertSame('Lorem', $this->appExtension->cutFilter('Lorem', 15));
    }

    public function testCutFilter_equal()
    {
        $this->assertSame('Lorem ipsum', $this->appExtension->cutFilter('Lorem ipsum', 11));
    }

    public function testCutFilter_mb()
    {
        $this->assertSame('Żó...', $this->appExtension->cutFilter('Żółćńüä', 5));
    }

    public function testCutFilter_rtrim()
    {
        $this->assertSame('Lorem...', $this->appExtension->cutFilter('Lorem ipsum', 9));
    }
}
