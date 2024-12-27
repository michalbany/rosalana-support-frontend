export function routeMatch(route: string, to: string) {
    const regex = new RegExp('^' + route.replace('/*', '.*') + '$');
    return regex.test(to);
}

export function appLogos() {
    return [
        // 'lucide:shield-question',
        'custom:blueprint-logo',
        'custom:proxyma-logo',
        'custom:rosalana-logo',
        'custom:support-logo',
        'custom:transfer-logo',
    ];
}