<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180904193519 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql("insert into app_user (username, username_canonical, email, email_canonical, enabled, password, roles) values (
 'admin'
 , 'admin'
 , 'admin@admin.com'
 , 'admin@admin.com'
 , 1
 , '$2y$13\$GVBlMozcIvdMtC8p7sr4IeC.I6TCmW/QQ15LDpnjty914vnoIPtQu'
 , 'a:0:{}'
)");
        $this->addSql('ALTER TABLE folder ADD user_id INT NULL');
        $this->addSql("update folder set user_id = (select id from app_user where username = 'admin')");
        $this->addSql('ALTER TABLE folder MODIFY COLUMN user_id INT NOT NULL');
        $this->addSql('ALTER TABLE folder ADD CONSTRAINT FK_ECA209CDA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id)');
        $this->addSql('CREATE INDEX IDX_ECA209CDA76ED395 ON folder (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE folder DROP FOREIGN KEY FK_ECA209CDA76ED395');
        $this->addSql('DROP INDEX IDX_ECA209CDA76ED395 ON folder');
        $this->addSql('ALTER TABLE folder DROP user_id');
    }
}
