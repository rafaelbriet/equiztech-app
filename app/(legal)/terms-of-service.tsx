import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

export default function TermsOfService() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 16,
            }}
        >
            <ScrollView>
                <Text variant="headlineSmall">Termos de Serviço</Text>
                <Text variant="titleMedium">1. Termos</Text>
                <Text>
                    Ao acessar ao site Equiztech, concorda em cumprir estes
                    termos de serviço, todas as leis e regulamentos aplicáveis e
                    concorda que é responsável pelo cumprimento de todas as leis
                    locais aplicáveis. Se você não concordar com algum desses
                    termos, está proibido de usar ou acessar este site. Os
                    materiais contidos neste site são protegidos pelas leis de
                    direitos autorais e marcas comerciais aplicáveis.
                </Text>
                <Text variant="titleMedium">2. Uso de Licença</Text>
                <Text>
                    É concedida permissão para baixar temporariamente uma cópia
                    dos materiais (informações ou software) no site Equiztech ,
                    apenas para visualização transitória pessoal e não
                    comercial. Esta é a concessão de uma licença, não uma
                    transferência de título e, sob esta licença, você não pode:{" "}
                </Text>
                <Text>1. modificar ou copiar os materiais; </Text>
                <Text>
                    2. usar os materiais para qualquer finalidade comercial ou
                    para exibição pública (comercial ou não comercial);
                </Text>
                <Text>
                    3. tentar descompilar ou fazer engenharia reversa de
                    qualquer software contido no site Equiztech;
                </Text>
                <Text>
                    4. remover quaisquer direitos autorais ou outras notações de
                    propriedade dos materiais; ou{" "}
                </Text>
                <Text>
                    5. transferir os materiais para outra pessoa ou 'espelhe' os
                    materiais em qualquer outro servidor.
                </Text>
                <Text>
                    Esta licença será automaticamente rescindida se você violar
                    alguma dessas restrições e poderá ser rescindida por
                    Equiztech a qualquer momento. Ao encerrar a visualização
                    desses materiais ou após o término desta licença, você deve
                    apagar todos os materiais baixados em sua posse, seja em
                    formato eletrónico ou impresso.
                </Text>
                <Text variant="titleMedium">
                    3. Isenção de responsabilidade
                </Text>
                <Text>
                    1. Os materiais no site da Equiztech são fornecidos 'como
                    estão'. Equiztech não oferece garantias, expressas ou
                    implícitas, e, por este meio, isenta e nega todas as outras
                    garantias, incluindo, sem limitação, garantias implícitas ou
                    condições de comercialização, adequação a um fim específico
                    ou não violação de propriedade intelectual ou outra violação
                    de direitos. 2. Além disso, o Equiztech não garante ou faz
                    qualquer representação relativa à precisão, aos resultados
                    prováveis ou à confiabilidade do uso dos materiais em seu
                    site ou de outra forma relacionado a esses materiais ou em
                    sites vinculados a este site.
                </Text>
                <Text variant="titleMedium">4. Limitações</Text>
                <Text>
                    Em nenhum caso o Equiztech ou seus fornecedores serão
                    responsáveis por quaisquer danos (incluindo, sem limitação,
                    danos por perda de dados ou lucro ou devido a interrupção
                    dos negócios) decorrentes do uso ou da incapacidade de usar
                    os materiais em Equiztech, mesmo que Equiztech ou um
                    representante autorizado da Equiztech tenha sido notificado
                    oralmente ou por escrito da possibilidade de tais danos.
                    Como algumas jurisdições não permitem limitações em
                    garantias implícitas, ou limitações de responsabilidade por
                    danos conseqüentes ou incidentais, essas limitações podem
                    não se aplicar a você.
                </Text>
                <Text variant="titleMedium">5. Precisão dos materiais</Text>
                <Text>
                    Os materiais exibidos no site da Equiztech podem incluir
                    erros técnicos, tipográficos ou fotográficos. Equiztech não
                    garante que qualquer material em seu site seja preciso,
                    completo ou atual. Equiztech pode fazer alterações nos
                    materiais contidos em seu site a qualquer momento, sem aviso
                    prévio. No entanto, Equiztech não se compromete a atualizar
                    os materiais.
                </Text>
                <Text variant="titleMedium">6. Links</Text>
                <Text>
                    O Equiztech não analisou todos os sites vinculados ao seu
                    site e não é responsável pelo conteúdo de nenhum site
                    vinculado. A inclusão de qualquer link não implica endosso
                    por Equiztech do site. O uso de qualquer site vinculado é
                    por conta e risco do usuário.
                </Text>
                <Text variant="titleSmall">Modificações</Text>
                <Text>
                    O Equiztech pode revisar estes termos de serviço do site a
                    qualquer momento, sem aviso prévio. Ao usar este site, você
                    concorda em ficar vinculado à versão atual desses termos de
                    serviço.
                </Text>
                <Text variant="titleSmall">Lei aplicável</Text>
                <Text>
                    Estes termos e condições são regidos e interpretados de
                    acordo com as leis do Equiztech e você se submete
                    irrevogavelmente à jurisdição exclusiva dos tribunais
                    naquele estado ou localidade.
                </Text>
            </ScrollView>
        </View>
    );
}
