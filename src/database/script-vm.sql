-- ================================================================
-- ________________________________________________________________
-- O Script abaixo é para criar um usuário e dar permissões, onde será utilizado na VM futuramente
-- criar usuário jogador
-- ________________________________________________________________
-- ================================================================

-- Via terminal, acesse seu usuário (Obs.: Logo após irá pedir a senha do usuário)
mysql -u 'root' -p

-- O Identified by significa a senha do usuário, NÃO CONFUNDA :)
create user 'beanyone'@'localhost' 
	identified by 'urubu#100';

-- permissões do usuário
-- permitir todos os comandos
grant all privileges on beany1.* 
	to 'beanyone'@'localhost';

flush privileges;

-- -- retirar as permissões
-- revoke all privileges on beany1.* 
-- 	from 'beanyone'@'localhost';
    
-- flush privileges;

-- -- permitir apenas o select
-- grant SELECT on sptecha.* 
-- 	to 'beanyone'@'localhost';

-- grant SELECT, UPDATE, DELETE, INSERT on sptecha.* 
-- to 'beanyone'@'localhost';
    
-- confirmar as permissões
-- flush privileges;

-- excluir o usuário
-- drop user 'beanyone'@'localhost';

-- ================================================================
-- ________________________________________________________________
-- O script abaixo será utilizado no terminal da Máquina Virtual para
-- a criação de um usuário sudo cujo será do Projeto.
-- ________________________________________________________________
-- ================================================================

-- Entre na conta do aluno SPTech
-- Verifique primeiro se está na conta
whoami
sudo adduser beanyone

-- alterarGrupo (-aG) do usuário criado pra sudo(grupo chefe)
sudo usermod -aG sudo beanyone

-- trocar de usuário
su beanyone

-- deletar usuário quando necessário
sudo userdel beany