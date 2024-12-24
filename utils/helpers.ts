export function routeMatch(route: string, to: string) {
    const regex = new RegExp('^' + route.replace('/*', '.*') + '$');
    return regex.test(to);
}